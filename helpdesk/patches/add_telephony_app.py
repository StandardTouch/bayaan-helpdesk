import frappe
from frappe.installer import install_app


def execute():
    try:
        if "telephony" in frappe.get_installed_apps() or frappe.db.exists("DocType", "Telephony Setting"):
            return
        install_app("telephony")
    except Exception:
        pass
