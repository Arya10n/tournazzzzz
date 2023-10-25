const getRedirect = async (organiserName, tournamentName) => {
    try {
        const response = await axios.get(`http://localhost:5000/redirect/to/${organiserName}/${tournamentName}`)
    } catch (err) {
        console.log(err)
    }
}