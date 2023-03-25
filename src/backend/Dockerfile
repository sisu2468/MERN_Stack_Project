FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 5000

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]