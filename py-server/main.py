import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps

# 순우리말과 한자어를 동적으로 생성
korean_numbers_dict = {
    "1": ["하나", "일"],
    "2": ["둘", "이"],
    "3": ["셋", "삼"],
    "4": ["넷", "사"],
    "5": ["다섯", "오"],
    "6": ["여섯", "육"],
    "7": ["일곱", "칠"],
    "8": ["여덟", "팔"],
    "9": ["아홉", "구"],
    "10": ["열", "십"],
    "20": ["스물", "이십"],
    "30": ["서른", "삼십"],
    "40": ["마흔", "사십"],
    "50": ["쉰", "오십"],
    "60": ["예순", "육십"],
    "70": ["일흔", "칠십"],
    "80": ["여든", "팔십"],
    "90": ["아흔", "구십"]
}

for i in range(11, 100):
    if i % 10 != 0:
        tens = str(i // 10 * 10)
        ones = str(i % 10)
        korean_numbers_dict[str(i)] = []
        if tens in korean_numbers_dict and ones in korean_numbers_dict:
            korean_numbers_dict[str(i)].append(korean_numbers_dict[tens][0] + korean_numbers_dict[ones][0])
            korean_numbers_dict[str(i)].append(korean_numbers_dict[tens][1] + korean_numbers_dict[ones][1])

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if 0 < int(self.path[1:]) < 100:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            # 앞서 생성한 dict의 key 값에 따라 순우리말과 한자어를 반환
            json_obj = {
                "순우리말": korean_numbers_dict[self.path[1:]][0],
                "한자어": korean_numbers_dict[self.path[1:]][1]
            }
            json_str = dumps(json_obj, ensure_ascii=False)
            self.wfile.write(bytes(json_str, encoding='utf-8'))
        else:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            json_obj = {
                "순우리말": "패턴 불일치",
                "한자어": "패턴 불일치"
            }
            json_str = dumps(json_obj, ensure_ascii=False)
            self.wfile.write(bytes(json_str, encoding='utf-8'))

if __name__ == "__main__":
    # 포트번호 입력 받기
    if len(sys.argv) != 2:
        print("Usage: python3 main.py <port>")
        sys.exit(1)
    try:
        host = 'localhost'
        port = int(sys.argv[1])

        server = HTTPServer((host, port), HTTPRequestHandler)

        print('Server start')
        server.serve_forever()

    except ValueError:
        print("Port must be a valid integer")
        sys.exit(1)
    except KeyboardInterrupt:
        server.server_close()
        print('Use Control + C')
        print('Server stopped')