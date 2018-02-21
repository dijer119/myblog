const result = {
	"resultCode": "success",
	"result": {
		"time": 1519086177891,
		"areas": [{
			"datas": [{
				"cd": "035420", // code
				"nv": 813000, // 현재가
				"eps": 22732, // eps, wisefn
				"bps": 124785.53696, // bps
				"cnsEps": 28885, // 추정 eps
				"ov": 818000,
				"sv": 820000,
				"cv": 7000,
				"nav": null,
				"aq": 7218,
				"aa": 5881072000,
				"nm": "NAVER", // 종목명
				"rf": "5",
				"mt": "1",
				"pcv": 820000,
				"tyn": "N",
				"ul": 1066000,
				"ll": 574000,
				"keps": 25746, // krx eps
				"dv": 1131.00000, // 배당
				"ms": "OPEN",
				"cr": 0.85,
				"hv": 818000,
				"lv": 811000
			}], "name": "SERVICE_ITEM"
		}],
		"pollingInterval": 3000
	}
}

console.log(result.result.areas[0].datas[0])