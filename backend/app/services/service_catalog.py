from typing import List, Optional
from app.schemas.service import ServiceItem
from app.services.client_catalog import get_clients_by_service

# ==============================================================================
# sBLOOM Genuine MVP Service Catalog
# Categories: Healthcare, Education, Professional Services
# Offerings: WhatsApp automation, Website building, SEO, Google Ads, Meta Ads
# ==============================================================================


CATALOG_SERVICES: List[ServiceItem] = [
    ServiceItem(
        id="srv-whatsapp-automation",
        name="WhatsApp Automation",
        category="Healthcare",
        tagline="Automated patient, student, and client communication workflows via WhatsApp",
        commission_rate="To be confirmed",
        avg_commission="Variable per client scope",
        cookie_duration="60 days",
        description="Zero-touch automated appointment booking, lead follow-ups, and customer notifications tailored for healthcare clinics, educational institutes, and professional firms.",
        features=[
            "Official WhatsApp Business API integration",
            "Automated reminders & confirmation sequences",
            "24/7 vernacular chatbot assistance",
        ],
    ),
    ServiceItem(
        id="srv-website-building",
        name="Website Building",
        category="Professional Services",
        tagline="High-performance conversion-optimized websites and landing pages",
        commission_rate="To be confirmed",
        avg_commission="Variable per client scope",
        cookie_duration="60 days",
        description="Custom-designed responsive websites engineered for clinics, educational academies, and professional service providers with built-in lead capture.",
        features=[
            "Mobile-first responsive architecture",
            "Built-in SEO & Core Web Vitals optimization",
            "Integrated appointment & inquiry forms",
        ],
    ),
    ServiceItem(
        id="srv-seo",
        name="Search Engine Optimization (SEO)",
        category="Healthcare",
        tagline="Dominant local and regional organic search visibility for service providers",
        commission_rate="To be confirmed",
        avg_commission="Variable per client scope",
        cookie_duration="60 days",
        description="Targeted on-page, technical, and local Google Maps optimization to attract high-intent local patients, students, and corporate clients.",
        features=[
            "Local Google Business Profile optimization",
            "High-intent local & regional keyword ranking",
            "Monthly transparent ranking & traffic audits",
        ],
    ),
    ServiceItem(
        id="srv-google-ads",
        name="Google Ads",
        category="Education",
        tagline="High-intent search and display campaigns driving qualified inbound inquiries",
        commission_rate="To be confirmed",
        avg_commission="Variable per client scope",
        cookie_duration="45 days",
        description="Precision PPC campaign setup and management designed to capture immediate demand for healthcare procedures, course enrollments, and professional consultations.",
        features=[
            "High-intent search keyword targeting",
            "Negative keyword pruning & budget optimization",
            "Conversion tracking with call attribution",
        ],
    ),
    ServiceItem(
        id="srv-meta-ads",
        name="Meta Ads",
        category="Professional Services",
        tagline="Targeted social acquisition funnels across Instagram, Facebook, and Messenger",
        commission_rate="To be confirmed",
        avg_commission="Variable per client scope",
        cookie_duration="45 days",
        description="Creative hyper-targeted lead generation campaigns designed to scale patient footfall, student admissions, and professional client acquisition.",
        features=[
            "Audience persona & demographic targeting",
            "High-converting ad creatives & copy testing",
            "Direct WhatsApp & Lead form integrations",
        ],
    ),
]


def get_all_services_with_clients() -> List[ServiceItem]:
    """Returns services with dynamically linked client businesses."""
    services = []
    for srv in CATALOG_SERVICES:
        srv_copy = srv.model_copy()
        srv_copy.clients = get_clients_by_service(srv.id)
        services.append(srv_copy)
    return services


def get_service_by_id(service_id: str) -> Optional[ServiceItem]:
    """Retrieve service definition by its ID."""
    for srv in CATALOG_SERVICES:
        if srv.id == service_id:
            srv_copy = srv.model_copy()
            srv_copy.clients = get_clients_by_service(srv.id)
            return srv_copy
    return None


def calculate_commission_for_services(service_ids: List[str]) -> tuple[str, str]:
    """
    Calculates estimated contract value and affiliate commission based on selected services.
    Note: Exact commission rates and contract values depend on approved client scope.
    """
    return "Custom Quote (Pending Scope)", "TBD upon deal verification"


