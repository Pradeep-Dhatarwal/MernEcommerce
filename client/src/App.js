import { BrowserRouter as Router } from "react-router-dom";
// import "./App.css";
import { DataProvider } from "./globalstate";
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'

function App() {
	return (
		<DataProvider>
			<Router >
				<div className="App">
					<Header/>
          <MainPages />
				</div>
			</Router>
		</DataProvider>
	);
}

export default App;