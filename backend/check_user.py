import asyncio
from sqlalchemy import select
from src.database import AsyncSessionLocal
from src.models.user import User
# Import other models to ensure relationships are resolved
from src.models.journal import JournalEntry
from src.models.assessment import AssessmentResult

DEV_USER_ID = "00000000-0000-0000-0000-000000000001"

async def check_user():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.id == DEV_USER_ID))
        user = result.scalar_one_or_none()
        if user:
            print(f"✅ User found: {user.id}, {user.email}")
        else:
            print(f"❌ User {DEV_USER_ID} NOT found!")

if __name__ == "__main__":
    asyncio.run(check_user())
