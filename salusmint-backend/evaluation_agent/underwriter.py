from typing import Any, Dict, List
import requests
import config

def fetch_signal(signal_names: List[str], adapter_inputs: Dict[str, Any]) -> Dict[str, Any]:
   """Fetch signals from the decentralized signal portfolio service.
   
   For more details about DSP service, see https://github.com/00labs/huma-signals/tree/main/huma_signals
   """
   request = {"signal_names": signal_names, "adapter_inputs": adapter_inputs}
   response = requests.post(config.signals_endpoint, json=request)
   if response.status_code != 200:
       raise ValueError(f"Error fetching signals: {response.text}")
   return {k: v for k, v in response.json().get("signals").items() if k in signal_names}


def underwrite(huma_pool, **kwargs):
    """
    The interface function between an EA and Huma EA service
    :param huma_pool: the object that represents huma pool contract
    :param **kwargs
        poolAddress:        str: the address for the destiny huma pool
        borrowerWalletAddress:      str: the borrower's wallet address
    :return: returns corresponding fields to UI
    """

    borrower_wallet_address = kwargs["borrowerWalletAddress"]  # noqa
    
    # to be removed
    result = {
            "creditLimit": int(10000*10**6),
            "intervalInDays": 30,
            "remainingPeriods": 12,
            "aprInBps": 0
        }
    
    # your code here
    
    # signal_names = [
    #     "ethereum_wallet.total_transactions",
    #     "ethereum_wallet.total_sent",
    #     "ethereum_wallet.total_received",
    #     "ethereum_wallet.wallet_teneur_in_days",
    #     "ethereum_wallet.total_income_90days",
    #     "ethereum_wallet.total_transactions_90days"
    #     ]
    
    # adapter_inputs = {"borrower_wallet_address": borrower_wallet_address}

    # signals = fetch_signal(signal_names, adapter_inputs)
    # if signals.get('ethereum_wallet.wallet_teneur_in_days') >= 365:
    #     result = {
    #         "creditLimit": int(100*10**6),
    #         "intervalInDays": 30,
    #         "remainingPeriods": 12,
    #         "aprInBps": 0
    #     }
    # else:
    #     raise Exception("accountTooNew")
    
    return result  # noqa
