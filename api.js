export default function() {
    //let url = 'http://172.20.10.2:3000/getTruewallet';
    let url = 'https://raw.githubusercontent.com/Ploythayanee/resReserApp/master/res.json';
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
}