# CryptoWave

## Installation

## Running the Application

Before running the application, make sure you have activated your virtual environment. If you haven't, you can do so by running:

# For Unix or MacOS

source venv/bin/activate

# For Windows

.\venv\Scripts\activate

# Running the Backend (Crypto_Wave_Fast_API)

To install the required packages, run the following command in your terminal. Make sure you're in the Crypto_Wave_Fast_API directory.

pip install -r requirements.txt

Once the virtual environment is activated and all the necessary packages are installed, you can start the ML Model by running the following command in your terminal:

python -m uvicorn main:app --reload

Please make sure to run this command in the Crypto_Wave_Fast_API directory.

## Running the Frontend (Crypto-Wave)

To start the frontend part of our application, open a new terminal in VS Code or in your command line. Navigate to the `Crypto_Wave` directory and run the following commands:

npm install

npm start
