const apiUrl = "http://api.mathjs.org/v4/"

async function request(url, data) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}

	return await fetch(url, options).then(res => res.json())
}

const name = document.getElementById("name") 
const monthyPayment = document.getElementById("monthyPayment") 
const time = document.getElementById("time")
const errorMessage = document.getElementById("errorMessage")

const form = document.getElementById("form")
const submitButton = document.getElementById("submitButton")
const secondScreen = document.getElementById("secondScreen")

const textAfterSimulation = document.getElementById("textAfterSimulation")

submitButton.addEventListener("click", async (e) => {
	e.preventDefault()
	
	const formIsValidate = name.value !== "" && monthyPayment.value !== "" && time.value !== ""

	if(!formIsValidate) {
		errorMessage.textContent = "Coloque as informações!"
		return
	} 

	form.style.display = "none"
	secondScreen.style.display = "flex"

	const nameValue = name.value
	const timeInMonth = (time.value) * 12
	const timeValue = time.value
	const monthyPaymentValue = monthyPayment.value

	const data = { "expr": `${monthyPaymentValue} * (((1 + 0.00517) ^ ${timeInMonth} - 1) / 0.00517)` }

	const apiData = await request(apiUrl, data)
	
	const { result } = apiData

	textAfterSimulation.textContent = `Olá ${nameValue}, juntando R$${monthyPaymentValue} todo mês, você terá R$${Number(result).toFixed(2)} em ${timeValue} anos`

	name.value = ""
	monthyPayment.value = ""
	time.value = ""
})

const simulationAgain = document.getElementById("simulationAgain")

simulationAgain.addEventListener("click", (e) => {
	form.style.display = "block"
	secondScreen.style.display = "none"
})