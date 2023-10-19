export default {
    // 모듈로 이용가능 하도록 네임스페이스 속성 true.
    namespaced: true,
    // 데이터 불변성을 위해 함수로 만들어서 데이터를 반환하도록 구현.
    state: () => ({
        name: 'mskim',
        email: 'orenti@naver.com',
        blog: 'https://techlog.tistory.com',
        phone: '010-1234-5678',
        image: 'https://heropy.blog/css/images/logo.png'
    })
}