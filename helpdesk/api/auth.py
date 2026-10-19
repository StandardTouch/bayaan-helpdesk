import frappe

from helpdesk.utils import is_agent as _is_agent


@frappe.whitelist(allow_guest=True)
def get_user():
    current_user = frappe.session.user
    filters = {"name": current_user}
    fields = [
        "first_name",
        "full_name",
        "name",
        "user_image",
        "username",
        "time_zone",
    ]
    user = frappe.get_value(
        doctype="User",
        filters=filters,
        fieldname=fields,
        as_dict=True,
    ) or {}

    if current_user == "Guest":
        has_desk_access = False
        is_admin = False
        is_agent = False
        is_manager = False
    else:
        user_type = frappe.db.get_value("User", current_user, "user_type")
        roles = set(frappe.get_roles(current_user))
        portal_roles = {"Helpdesk User", "Helpdesk Contact", "Customer", "All", "Guest"}
        non_portal_roles = roles - portal_roles
        is_admin = bool(roles.intersection({"System Manager", "Administrator"})) or current_user == "Administrator"
        is_agent = _is_agent() and (user_type == "System User" or current_user == "Administrator")
        has_desk_access = (user_type == "System User" or current_user == "Administrator") and (bool(non_portal_roles) or is_agent or is_admin)
        is_manager = ("Agent Manager") in roles

    user_image = user.get("user_image")
    user_first_name = user.get("first_name")
    user_name = user.get("full_name")
    user_id = user.get("name") or current_user
    username = user.get("username")

    return {
        "has_desk_access": has_desk_access,
        "is_admin": is_admin,
        "is_agent": is_agent,
        "user_id": user_id,
        "is_manager": is_manager,
        "user_image": user_image,
        "user_first_name": user_first_name,
        "user_name": user_name,
        "username": username,
        "time_zone": user.get("time_zone"),
    }


@frappe.whitelist(allow_guest=True)
def get_post_login_redirect():
    current_user = frappe.session.user
    if current_user == "Guest":
        return "/helpdesk/login"

    user_type = frappe.db.get_value("User", current_user, "user_type")
    roles = set(frappe.get_roles(current_user))
    portal_roles = {"Helpdesk User", "Helpdesk Contact", "Customer", "All", "Guest"}
    non_portal_roles = roles - portal_roles

    if user_type != "System User" and current_user != "Administrator" and not non_portal_roles:
        return "/helpdesk/my-tickets"
    elif non_portal_roles or user_type == "System User" or current_user == "Administrator":
        return "/app"

    # Otherwise only helpdesk user role -> customer portal
    return "/helpdesk/my-tickets"


@frappe.whitelist(allow_guest=True)
def oauth_providers():
    from frappe.utils.html_utils import get_icon_html
    from frappe.utils.oauth import get_oauth2_authorize_url, get_oauth_keys
    from frappe.utils.password import get_decrypted_password

    out = []
    providers = frappe.get_all(
        "Social Login Key",
        filters={"enable_social_login": 1},
        fields=["name", "client_id", "base_url", "provider_name", "icon"],
        order_by="name",
    )

    for provider in providers:
        try:
            client_secret = get_decrypted_password(
                "Social Login Key", provider.name, "client_secret"
            )
        except Exception:
            client_secret = None
        if not client_secret:
            continue

        icon = None
        if provider.icon:
            if provider.provider_name == "Custom":
                icon = get_icon_html(provider.icon, small=True)
            else:
                icon = f"<img src='{provider.icon}' alt={provider.provider_name}>"

        if provider.client_id and provider.base_url and get_oauth_keys(provider.name):
            out.append(
                {
                    "name": provider.name,
                    "provider_name": provider.provider_name,
                    "auth_url": get_oauth2_authorize_url(provider.name, "/helpdesk"),
                    "icon": icon,
                }
            )

    return out
