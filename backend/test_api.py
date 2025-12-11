import urllib.request
import json

API_URL = "http://127.0.0.1:8000/api/v1"

def test_create_entry():
    print("Testing create entry...")
    payload = {
        "title": "Test Entry",
        "content": "This is a test content.",
        "entry_date": "2025-12-11"
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(f"{API_URL}/journal/entries", data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status Code: {response.getcode()}")
            print(f"Response: {response.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"Status Code: {e.code}")
        print(f"Response: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_create_entry()
