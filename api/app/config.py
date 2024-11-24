import os 

SECRET_KEY=os.environ.get('SECRET_KEY')

JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY')

SQLALCHEMY_DATABASE_URL=f"postgresql://postgres:{os.environ.get('DATABASE_PASSWORD')}@127.0.0.1/fastapi_and_next"
