const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    background: '#ffffff', 
                    surface: '#f5f5f5', 
                    primary: '#000000',
                    secondary: '#757575', 
                    error: '#d32f2f', 
                    text: '#121212', 
                    white: '#ffffff',
                    black: '#000000' 
                },
            },
        },
    },
});

const app = createApp({
    data() {
        return {
            qlist: [],
            answers: [],
            score: 0,
            page: 1,
        };
    },
    mounted() {
        this.loadQuestions();
    },
    methods: {
        async loadQuestions() {
            const response = await fetch('./quiz.json');
            this.qlist = await response.json();
        },
        validate() {
            return this.answers.length === this.qlist.length && !this.answers.includes(undefined);
        },
        grading() {
            this.score = this.qlist.reduce((total, question, index) => {
                return total + (this.answers[index] === question.answer ? 1 : 0);
            }, 0);
            this.page = 3;
        },
        restart() {
            this.answers = [];
            this.score = 0;
            this.page = 1;
        },
    },
});

app.use(vuetify).mount('#app');