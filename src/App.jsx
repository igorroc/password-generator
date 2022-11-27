import { Icon } from "@iconify/react"
import { useState } from "react"
import "./App.css"

const StrengthEnum = ["MUITO FRACA", "FRACA", "MÉDIA", "FORTE", "MUITO FORTE", "PRA QUE ISSO TUDO?"]

function App() {
	const [result, setResult] = useState("senha")
	const [tamanho, setTamanho] = useState(4)
	const [lowerCase, setLowerCase] = useState(true)
	const [upperCase, setUpperCase] = useState(false)
	const [numeros, setNumeros] = useState(false)
	const [simbolos, setSimbolos] = useState(false)

	const [strength, setStrength] = useState(1)

	function gerarSenha(e) {
		e.preventDefault()

		if (!upperCase && !lowerCase && !numeros && !simbolos) {
			alert("Selecione pelo menos uma opção")
			return
		}

		let alfabeto = ""
		let forcaDaSenha = 0

		if (lowerCase) {
			alfabeto += "abcdefghijklmnopqrstuvwxyz"
			forcaDaSenha += 1
		}

		if (upperCase) {
			alfabeto += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			forcaDaSenha += 1
		}

		if (numeros) {
			alfabeto += "0123456789"
			forcaDaSenha += 1
		}

		if (simbolos) {
			alfabeto += "!@#$%&*()_+"
			forcaDaSenha += 1
		}

		forcaDaSenha *= tamanho
		let newResult = ""
		for (let i = 0; i < tamanho; i++) {
			let randomNumber = Math.floor(Math.random() * alfabeto.length)

			newResult += alfabeto[randomNumber]
		}

		console.log(forcaDaSenha)
		if (forcaDaSenha < 10) setStrength(0)
		else if (forcaDaSenha < 20) setStrength(1)
		else if (forcaDaSenha < 30) setStrength(2)
		else if (forcaDaSenha < 40) setStrength(3)
		else if (forcaDaSenha < 100) setStrength(4)
		else setStrength(5)

		setResult(newResult)
	}

	return (
		<div className="App">
			<h1>Gerador de Senhas</h1>
			<div className="resultado modal">
				<p>{result}</p>
				<button className="copy" onClick={() => navigator.clipboard.writeText(result)}>
					<Icon icon="material-symbols:content-copy" />
				</button>
			</div>
			<div className="modal">
				<form onSubmit={gerarSenha}>
					<div className="tamanho">
						<p>Tamanho da senha</p>
						<input
							type="number"
							value={tamanho}
							onChange={(ev) => setTamanho(ev.target.value)}
						/>
					</div>
					<input
						className="rangeTamanho"
						type="range"
						name="tamanho"
						id="tamanho"
						min={1}
						max={32}
						value={tamanho}
						onChange={(ev) => setTamanho(ev.target.value)}
					/>
					<div className="checkInput">
						<input
							type="checkbox"
							name="lowerCase"
							id="lowerCase"
              checked={lowerCase}
							onChange={() => setLowerCase((prev) => !prev)}
						/>
						<label htmlFor="lowerCase">Incluir letras minusculas</label>
					</div>
					<div className="checkInput">
						<input
							type="checkbox"
							name="upperCase"
							id="upperCase"
							checked={upperCase}
							onChange={() => setUpperCase((prev) => !prev)}
						/>
						<label htmlFor="upperCase">Incluir letras maiúsculas</label>
					</div>
					<div className="checkInput">
						<input
							type="checkbox"
							name="numeros"
							id="numeros"
							checked={numeros}
							onChange={() => setNumeros((prev) => !prev)}
						/>
						<label htmlFor="numeros">Incluir números</label>
					</div>
					<div className="checkInput">
						<input
							type="checkbox"
							name="simbolos"
							id="simbolos"
							checked={simbolos}
							onChange={() => setSimbolos((prev) => !prev)}
						/>
						<label htmlFor="simbolos">Incluir símbolos</label>
					</div>
					<div className="strength">
						<p>Força da senha</p>
						<div className="strengthInfo">
							<p>{StrengthEnum[strength]}</p>
							<div className="strengthBar">
								{[...Array(4)].map((_, i) => (
									<span className={i < strength ? "active" : ""} key={i}></span>
								))}
							</div>
						</div>
					</div>
					<button className="gerarButton" type="submit">
						Gerar
						<Icon icon="tabler:arrow-narrow-right" width={24} />
					</button>
				</form>
			</div>
		</div>
	)
}

export default App
