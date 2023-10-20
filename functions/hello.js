exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: 'ms kim',
            age: 80,
            email: 'orenti@naver.com'
        })
    }
}