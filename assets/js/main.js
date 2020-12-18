const app = new Vue({
    el: '#app',
    data: {
        projectTitle: 'Vue.js Test',
        header: {
            title: 'Example',
            subtitle: 'This app tests the vue.js using data from SWAPI'
        },
        menuItems: [
            {
                menuName: 'films',
                menuUrl: '#films',
                menuText: 'Films'
            },
            {
                menuName: 'people',
                menuUrl: '#people',
                menuText: 'People'
            }
        ],
        background: {
            background: 'url(assets/img/home-bg.jpg) no-repeat center center',
            backgroundAttachment: 'scroll',
            backgroundSize: 'cover'
        },
        currentView: 'filmsView',
        currentItem: null,
        people: [],
        films: [],
        peoplePage: 1,
        filmsPage: 1,
        peopleCount: 0,
        filmsCount: 0
    },
    computed: {},
    methods: {
        displayView(viewName) {
            return this.currentView === viewName
        },
        displayItem(viewName, itemId) {
            return (this.currentView === viewName && this.currentItem === itemId)
        },
        updateView(viewName) {
            this.currentView = viewName + 'View'
        },
        updateItem(id) {
            this.currentItem = id
        },
        updatePage(collection, action) {
            if (collection === 'films'){
                switch (action){
                    case 'increase':
                        this.filmsPage += 1;
                        break;
                    case 'decrease':
                        this.filmsPage -= 1;
                        break;
                }
                this.reFetch(collection);
            }else if (collection === 'people'){
                switch (action){
                    case 'increase':
                        this.peoplePage += 1;
                        break;
                    case 'decrease':
                        this.peoplePage -= 1;
                        break;
                }
                this.reFetch(collection);
            }
        },
        showNavi(collection, type) {
            if (collection === 'films') {
                switch (type) {
                    case 'next':
                        return this.filmsPage < parseInt(this.filmsCount / 10) + 1;
                        break;
                    case 'previous':
                        return this.filmsPage > 1 && parseInt(this.filmsCount) > 10;
                }
            } else if (collection === 'people') {
                switch (type) {
                    case 'next':
                        return this.peoplePage < (this.peopleCount / 10) + 1;
                        break;
                    case 'previous':
                        console.log(this.peoplePage);
                        console.log(this.peopleCount > 10);
                        console.log(this.peoplePage > 1 && this.peopleCount > 10);
                        return this.peoplePage > 1 && this.peopleCount > 10;
                }
            }

        },
        reFetch(collection){
            switch(collection){
                case 'films':
                    fetch('https://swapi.dev/api/films/?page=' + this.filmsPage)
                        .then(response => response.json())
                        .then(json => {
                            this.films = json.results;
                            this.filmsCount = json.count;
                        });
                    break;
                case 'people':
                    fetch('https://swapi.dev/api/people/?page=' + this.peoplePage)
                        .then(response => response.json())
                        .then(json => {
                            this.people = json.results;
                            this.peopleCount = json.count;
                        });
                    break;
            }
        }
    },
    created() {
        fetch('https://swapi.dev/api/people/?page=' + this.peoplePage)
            .then(response => response.json())
            .then(json => {
                this.people = json.results;
                this.peopleCount = json.count;
            });
        fetch('https://swapi.dev/api/films/?page=' + this.filmsPage)
            .then(response => response.json())
            .then(json => {
                this.films = json.results;
                this.filmsCount = json.count;
            });
    },
});
Vue.config.devtools = true;
Vue.config.debug = true;