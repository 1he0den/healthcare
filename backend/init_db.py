import asyncio
import uuid
from sqlalchemy import select
from src.database import engine, Base, AsyncSessionLocal
from src.models.user import User
from src.models import journal, assessment  # Import all models to ensure tables are registered

# Тот же ID, что мы прописали в deps.py
DEV_USER_ID = "00000000-0000-0000-0000-000000000001"

async def init_db():
    print("🔄 Initializing database...")
    
    # 1. Создаем таблицы
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Tables created (if not existed).")

    # 2. Создаем тестового пользователя
    async with AsyncSessionLocal() as session:
        # Проверяем, существует ли пользователь
        result = await session.execute(select(User).where(User.id == DEV_USER_ID))
        user = result.scalar_one_or_none()

        if not user:
            print(f"👤 Creating dev user with ID: {DEV_USER_ID}")
            new_user = User(
                id=DEV_USER_ID,
                email="dev@example.com",
                full_name="Developer User",
                bio="This is a test user for development."
            )
            session.add(new_user)
            await session.commit()
            print("✅ Dev user created successfully!")
        else:
            print("ℹ️ Dev user already exists.")

if __name__ == "__main__":
    asyncio.run(init_db())
