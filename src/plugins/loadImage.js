export default {
    install(app) {
        app.config.globalProperties.$loadImage = src => {
            return new Promise(resolve => {
                const img = document.createElement('img');
                img.src = src;
                // * 이미지 로드가 완료되면 로딩바를 false로 변경.
                // * 콜백을 화살표 함수로 작성해야 this 로 접근시 현재 컴포넌트인 MovieItem.vue 의 script에 작성된
                // imageLoading으로 접근한다.
                // function 키워드로 콜백을 작성하면 호출한 위치에서의 imageLoading으로 접근한다.
                // * load 이벤트가 완료되면 resolve 실행.
                img.addEventListener('load', () => {
                    // 완료. catch나 then으로 진행.
                    resolve();
                });
            })
        }
    }
}