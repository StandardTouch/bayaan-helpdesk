import frappe
from frappe import _
from frappe.auth import LoginManager
from frappe.core.doctype.user.user import test_password_strength


@frappe.whitelist(allow_guest=True)
def register_portal_user(full_name, email, password, company_name=None):
    """
    Direct client signup for customer portal.
    Creates a Website User with only 'Helpdesk Contact' role,
    creates linked Contact and HD Customer, and immediately logs the user in.
    """
    if not full_name or not full_name.strip():
        frappe.throw(_("Full Name is required"))

    if not email or not email.strip():
        frappe.throw(_("Work Email is required"))

    if not password or len(password) < 6:
        frappe.throw(_("Password must be at least 6 characters"))

    email = email.strip().lower()
    frappe.utils.validate_email_address(email, throw=True)

    if frappe.db.exists("User", email):
        frappe.throw(_("An account with this email already exists. Please log in."))

    parts = full_name.strip().split(" ", 1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""
    company_name = (company_name or "").strip()

    current_user = frappe.session.user
    frappe.set_user("Administrator")

    try:
        # Ensure 'Helpdesk User' role exists
        if not frappe.db.exists("Role", "Helpdesk User"):
            hd_role = frappe.new_doc("Role")
            hd_role.role_name = "Helpdesk User"
            hd_role.desk_access = 0
            hd_role.insert(ignore_permissions=True)

        user = frappe.get_doc(
            {
                "doctype": "User",
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "send_welcome_email": 0,
                "user_type": "Website User",
                "roles": [
                    {"role": "Helpdesk User"},
                    {"role": "Helpdesk Contact"},
                ],
            }
        )
        user.flags.delay_password_email = True
        user.insert(ignore_permissions=True)

        from frappe.utils.password import update_password
        update_password(user.name, password)

        # Create or link HD Customer if company_name provided
        if company_name:
            if not frappe.db.exists("HD Customer", company_name):
                hd_customer = frappe.new_doc("HD Customer")
                hd_customer.customer_name = company_name
                if "@" in email:
                    domain = email.split("@")[1]
                    common_domains = [
                        "gmail.com",
                        "yahoo.com",
                        "hotmail.com",
                        "outlook.com",
                        "icloud.com",
                    ]
                    if domain not in common_domains:
                        hd_customer.domain = domain
                hd_customer.insert(ignore_permissions=True)

        # Create or link Contact
        if not frappe.db.exists("Contact", {"email_id": email}):
            contact = frappe.new_doc("Contact")
            contact.first_name = first_name
            contact.last_name = last_name
            contact.company_name = company_name
            contact.append("email_ids", {"email_id": email, "is_primary": 1})
            contact.user = user.name
            if company_name and frappe.db.exists("HD Customer", company_name):
                contact.append(
                    "links",
                    {
                        "link_doctype": "HD Customer",
                        "link_name": company_name,
                    },
                )
            contact.insert(ignore_permissions=True)
        else:
            contact = frappe.get_doc("Contact", {"email_id": email})
            contact.user = user.name
            if company_name:
                contact.company_name = company_name
            if company_name and frappe.db.exists("HD Customer", company_name):
                already_linked = any(
                    l.link_doctype == "HD Customer" and l.link_name == company_name
                    for l in contact.links
                )
                if not already_linked:
                    contact.append(
                        "links",
                        {
                            "link_doctype": "HD Customer",
                            "link_name": company_name,
                        },
                    )
            contact.save(ignore_permissions=True)

        # Log in the user immediately
        frappe.set_user(user.name)
        if hasattr(frappe.local, "login_manager") and frappe.local.login_manager:
            frappe.local.login_manager.login_as(user.name)
        elif hasattr(frappe.local, "request") and frappe.local.request:
            try:
                login_manager = LoginManager()
                login_manager.login_as(user.name)
            except Exception:
                pass

        frappe.db.commit()

        roles = set(frappe.get_roles(user.name))
        portal_roles = {"Helpdesk User", "Helpdesk Contact", "Customer", "All", "Guest"}
        non_portal_roles = roles - portal_roles
        user_type = frappe.db.get_value("User", user.name, "user_type")

        if user_type != "System User" and user.name != "Administrator" and not non_portal_roles:
            redirect_to = "/helpdesk/my-tickets"
        elif non_portal_roles or user_type == "System User" or user.name == "Administrator":
            redirect_to = "/app"
        else:
            redirect_to = "/helpdesk/my-tickets"

        return {
            "status": "success",
            "message": _("Account created successfully"),
            "user": user.name,
            "full_name": user.full_name or first_name,
            "redirect_to": redirect_to,
        }
    except Exception as e:
        frappe.db.rollback()
        frappe.set_user(current_user)
        frappe.throw(str(e))


@frappe.whitelist(allow_guest=True)
def signup(email, first_name, last_name):
    frappe.utils.validate_email_address(email, True)

    current_user = frappe.session.user
    frappe.set_user("Administrator")

    email = email.strip().lower()

    if not frappe.db.exists("User", email):
        user = frappe.get_doc(
            {
                "doctype": "User",
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "send_welcome_email": 0,
                "user_type": "Website User",
                "roles": [{"role": "Helpdesk Contact"}],
            }
        ).insert()

        frappe.get_doc(
            {
                "doctype": "HD Desk Account Request",
                "email": email,
                "user": user.name,
            }
        ).insert()

        frappe.set_user(current_user)
    else:
        frappe.set_user(current_user)
        frappe.throw(_("User already exists, please try logging in using this email"))


@frappe.whitelist(allow_guest=True)
def verify_and_create_account(request_key, email, password):
    account_request = frappe.get_doc("HD Desk Account Request", {"email": email})
    if account_request:
        if account_request.request_key == request_key:
            current_user = frappe.session.user
            frappe.set_user("Administrator")

            user = frappe.get_doc("User", account_request.user)
            user.new_password = password
            user.save()

            frappe.set_user(current_user)
        else:
            frappe.throw(_("Invalid request key"))
    else:
        frappe.throw(_("Account request for {0} not found, please signup first").format(email))


@frappe.whitelist(allow_guest=True)
def validate_password(password, first_name, last_name, email):
    available = True

    user_data = (first_name, last_name, email)
    result = test_password_strength(password, "", None, user_data)
    feedback = result.get("feedback")

    if feedback and not feedback.get("password_policy_validation_passed", False):
        available = False

    return available


def on_user_insert(doc, method=None):
    """
    Hook called after any User is created.
    If it is a Website User (such as through Google/Apple OAuth or portal signup),
    ensure they are assigned the 'Helpdesk Contact' role and have a linked Contact,
    without any Desk or ERPNext module access.
    """
    if doc.user_type == "Website User":
        roles = [r.role for r in doc.roles]
        if "Helpdesk Contact" not in roles:
            doc.append("roles", {"role": "Helpdesk Contact"})
            doc.save(ignore_permissions=True)

        if not frappe.db.exists("Contact", {"email_id": doc.email}):
            contact = frappe.new_doc("Contact")
            contact.first_name = doc.first_name or doc.email.split("@")[0]
            contact.last_name = doc.last_name or ""
            contact.append("email_ids", {"email_id": doc.email, "is_primary": 1})
            contact.user = doc.name
            contact.insert(ignore_permissions=True)
