from dataclasses import dataclass


@dataclass
class DistributorProfile:
    name: str
    city: str
    estimated_monthly_demand: int
    investment_capacity: int
    retailer_count: int
    warehouse_sqft: int
    delivery_vehicles: int
    salespeople: int
    years_in_fmcg: int
    credit_score: int
    payment_delay_days: int


class DistributorAppointmentAgent:

    def __init__(self):
        self.weights = {
            "market": 25,
            "financial": 20,
            "retailer": 15,
            "warehouse": 10,
            "logistics": 10,
            "experience": 10,
            "credit": 10,
        }

    # -------------------------------------------------
    # MARKET SCORE
    # -------------------------------------------------

    def market_score(self, distributor: DistributorProfile) -> float:

        demand = distributor.estimated_monthly_demand

        if demand >= 50000:
            return 100

        if demand >= 30000:
            return 90

        if demand >= 20000:
            return 80

        if demand >= 10000:
            return 65

        if demand >= 5000:
            return 50

        return 30

    # -------------------------------------------------
    # FINANCIAL SCORE
    # -------------------------------------------------

    def financial_score(self, distributor: DistributorProfile) -> float:

        investment = distributor.investment_capacity

        if investment >= 1000000:
            return 100

        if investment >= 750000:
            return 90

        if investment >= 500000:
            return 80

        if investment >= 300000:
            return 65

        if investment >= 150000:
            return 50

        return 30

    # -------------------------------------------------
    # RETAILER COVERAGE SCORE
    # -------------------------------------------------

    def retailer_score(self, distributor: DistributorProfile) -> float:

        retailers = distributor.retailer_count

        if retailers >= 1000:
            return 100

        if retailers >= 750:
            return 90

        if retailers >= 500:
            return 80

        if retailers >= 300:
            return 65

        if retailers >= 150:
            return 50

        return 30

    # -------------------------------------------------
    # WAREHOUSE SCORE
    # -------------------------------------------------

    def warehouse_score(self, distributor: DistributorProfile) -> float:

        sqft = distributor.warehouse_sqft

        if sqft >= 5000:
            return 100

        if sqft >= 3000:
            return 85

        if sqft >= 2000:
            return 70

        if sqft >= 1000:
            return 55

        return 30

    # -------------------------------------------------
    # LOGISTICS SCORE
    # -------------------------------------------------

    def logistics_score(self, distributor: DistributorProfile) -> float:

        vehicles = distributor.delivery_vehicles
        salespeople = distributor.salespeople

        score = 0

        # Vehicle component
        if vehicles >= 10:
            score += 50
        elif vehicles >= 5:
            score += 40
        elif vehicles >= 3:
            score += 30
        elif vehicles >= 1:
            score += 20

        # Sales team component
        if salespeople >= 15:
            score += 50
        elif salespeople >= 10:
            score += 40
        elif salespeople >= 5:
            score += 30
        elif salespeople >= 2:
            score += 20

        return score

    # -------------------------------------------------
    # EXPERIENCE SCORE
    # -------------------------------------------------

    def experience_score(self, distributor: DistributorProfile) -> float:

        years = distributor.years_in_fmcg

        if years >= 10:
            return 100

        if years >= 7:
            return 90

        if years >= 5:
            return 80

        if years >= 3:
            return 65

        if years >= 1:
            return 50

        return 30

    # -------------------------------------------------
    # CREDIT SCORE
    # -------------------------------------------------

    def credit_score(self, distributor: DistributorProfile) -> float:

        score = distributor.credit_score
        delay = distributor.payment_delay_days

        # Start with credit score
        if score >= 800:
            result = 100
        elif score >= 750:
            result = 90
        elif score >= 700:
            result = 80
        elif score >= 650:
            result = 65
        elif score >= 600:
            result = 50
        else:
            result = 30

        # Penalize payment delays
        if delay > 60:
            result -= 30
        elif delay > 30:
            result -= 20
        elif delay > 15:
            result -= 10

        return max(result, 0)

    # -------------------------------------------------
    # TOTAL SCORE
    # -------------------------------------------------

    def calculate_score(self, distributor: DistributorProfile):

        scores = {
            "market": self.market_score(distributor),
            "financial": self.financial_score(distributor),
            "retailer": self.retailer_score(distributor),
            "warehouse": self.warehouse_score(distributor),
            "logistics": self.logistics_score(distributor),
            "experience": self.experience_score(distributor),
            "credit": self.credit_score(distributor),
        }

        total = 0

        for category, score in scores.items():
            weight = self.weights[category]

            total += score * weight / 100

        return round(total, 2), scores

    # -------------------------------------------------
    # EXPECTED MONTHLY SALES
    # -------------------------------------------------

    def expected_monthly_sales(
        self,
        distributor: DistributorProfile
    ):

        retailer_demand = distributor.estimated_monthly_demand

        coverage_factor = min(
            distributor.retailer_count / 1000,
            1
        )

        estimated_sales = retailer_demand * coverage_factor

        return round(estimated_sales)

    # -------------------------------------------------
    # OPENING STOCK
    # -------------------------------------------------

    def recommended_opening_stock(
        self,
        distributor: DistributorProfile
    ):

        monthly_sales = self.expected_monthly_sales(distributor)

        # Approximately 15 days of stock
        opening_stock = monthly_sales * 0.5

        return round(opening_stock)

    # -------------------------------------------------
    # CREDIT LIMIT
    # -------------------------------------------------

    def recommended_credit_limit(
        self,
        distributor: DistributorProfile,
        score: float
    ):

        monthly_sales = self.expected_monthly_sales(distributor)

        if score >= 85:
            multiplier = 1.0
        elif score >= 75:
            multiplier = 0.75
        elif score >= 65:
            multiplier = 0.50
        else:
            multiplier = 0.25

        credit_limit = monthly_sales * 100 * multiplier

        return round(credit_limit)

    # -------------------------------------------------
    # DECISION ENGINE
    # -------------------------------------------------

    def decision(self, score: float):

        if score >= 85:
            return "APPROVE"

        if score >= 70:
            return "REVIEW"

        return "REJECT"

    # -------------------------------------------------
    # REASONS
    # -------------------------------------------------

    def generate_recommendations(
        self,
        distributor: DistributorProfile,
        scores: dict
    ):

        recommendations = []

        if scores["market"] < 60:
            recommendations.append(
                "Market potential is weak."
            )

        if scores["financial"] < 60:
            recommendations.append(
                "Distributor needs stronger financial capacity."
            )

        if scores["retailer"] < 60:
            recommendations.append(
                "Retailer network is insufficient."
            )

        if scores["warehouse"] < 60:
            recommendations.append(
                "Warehouse capacity should be improved."
            )

        if scores["logistics"] < 60:
            recommendations.append(
                "More delivery vehicles or salespeople are required."
            )

        if scores["experience"] < 60:
            recommendations.append(
                "Distributor has limited FMCG experience."
            )

        if scores["credit"] < 60:
            recommendations.append(
                "Credit/payment risk is high."
            )

        if not recommendations:
            recommendations.append(
                "Distributor profile is strong."
            )

        return recommendations

    # -------------------------------------------------
    # MAIN AGENT
    # -------------------------------------------------

    def evaluate(self, distributor: DistributorProfile):

        total_score, scores = self.calculate_score(
            distributor
        )

        decision = self.decision(total_score)

        monthly_sales = self.expected_monthly_sales(
            distributor
        )

        opening_stock = self.recommended_opening_stock(
            distributor
        )

        credit_limit = self.recommended_credit_limit(
            distributor,
            total_score
        )

        recommendations = self.generate_recommendations(
            distributor,
            scores
        )

        return {
            "distributor": distributor.name,
            "city": distributor.city,
            "score": total_score,
            "decision": decision,
            "category_scores": scores,
            "expected_monthly_sales_units": monthly_sales,
            "recommended_opening_stock_units": opening_stock,
            "recommended_credit_limit": credit_limit,
            "recommendations": recommendations,
        }