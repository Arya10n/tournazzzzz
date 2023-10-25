const getTournamentData = async (organiserName, tournamentName) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/tournament/info/${organiserName}/${tournamentName}`)
        return response.data;

    } catch (err) {
        console.log(err)
    }
}
let url = window.location.href
url = url.slice('/')
const data = getTournamentData(url[url.length-2], url[url.length-1])