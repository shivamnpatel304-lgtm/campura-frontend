from app.agents.inventory_agent import InventoryAgent
from app.agents.sales_agent import SalesAgent
from app.agents.forecast_agent import ForecastAgent
from app.agents.logistics_agent import LogisticsAgent
from app.agents.email_agent import EmailAgent

from app.orchestration.decision_engine import DecisionEngine
from app.orchestration.approval_service import ApprovalService


class AgentOrchestrator:

    def __init__(self):

        # Initialize Agents
        self.inventory_agent = InventoryAgent()
        self.sales_agent = SalesAgent()
        self.forecast_agent = ForecastAgent()
        self.logistics_agent = LogisticsAgent()
        self.email_agent = EmailAgent()

        # Initialize Orchestration Services
        self.decision_engine = DecisionEngine()
        self.approval_service = ApprovalService()

    def run(self, data: dict) -> dict:

        # 1. Inventory Agent
        inventory_result = self.inventory_agent.execute(data)

        # 2. Sales Agent
        sales_result = self.sales_agent.execute(data)

        # 3. Forecast Agent
        forecast_result = self.forecast_agent.execute(data)

        # 4. Logistics Agent
        logistics_result = self.logistics_agent.execute(data)

        # 5. Email Agent
        email_result = self.email_agent.execute(data)

        # 6. Decision Engine
        decision = self.decision_engine.make_decision(
            inventory_result,
            sales_result,
            forecast_result
        )

        # 7. Check whether human approval is required
        approval_required = self.approval_service.requires_approval(
            decision
        )

        # 8. Create approval request if required
        approval = None

        if approval_required:
            approval = self.approval_service.create_request(
                decision
            )

        # 9. Return complete agent response
        return {
            "inventory": inventory_result,
            "sales": sales_result,
            "forecast": forecast_result,
            "logistics": logistics_result,
            "email": email_result,
            "decision": decision,
            "approval_required": approval_required,
            "approval": approval
        }