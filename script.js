new Vue({
    el: "#app",
    data() {
      return {
        posts: [],
        postsLoading: false,
        nextPage: null,
        searchText: "",
        filterCategory: 1,
        currentSub: "oldschoolcool",
        permaLink: "https://www.reddit.com",
        isActive: true,
        fixedUrl: "",
        subs: [
          {
            name: "r/awww",
            url: "https://www.reddit.com/r/Awww/",
            isSubscribed: true,
            tagline: "Things that make you go AWWW!"
          },
          {
            name: "r/bettereveryloop",
            url: "https://www.reddit.com/r/bettereveryloop/",
            isSubscribed: true,
            tagline: "They keep getting better the longer you watch them!"
          },
          {
            name: "r/explainlikeimfive",
            url: "https://www.reddit.com/r/explainlikeimfive/",
            isSubscribed: false,
            tagline: "Don't Panic! Layman-friendly explanations"
          },
          {
            name: "r/gifs",
            url: "https://www.reddit.com/r/gifs/",
            isSubscribed: true,
            tagline: "Funny, animated gifs. Officially pronounced with a hard 'J'"
          },
          {
            name: "r/nevertellmetheodds",
            url: "https://www.reddit.com/r/nevertellmetheodds/",
            isSubscribed: false,
            tagline: "Nearly impossible feats of achievement"
          },
          {
            name: "r/oldschoolcool",
            url: "https://www.reddit.com/r/oldschoolcool/",
            isSubscribed: false,
            tagline: "History's cool kids, looking fantastic!"
          },
          {
            name: "r/combinedgifs",
            url: "https://www.reddit.com/r/combinedgifs/",
            isSubscribed: true,
            tagline: "A subreddit for gifs put together in a relevant manner"
          },
          {
            name: "r/theydidthemath",
            url: "https://www.reddit.com/r/theydidthemath/",
            isSubscribed: true,
            tagline: "And they said math has no real world applications"
          },
          {
            name: "r/todayilearned",
            url: "https://www.reddit.com/r/todayilearned/",
            isSubscribed: false,
            tagline:
              "You learn something new every day; what did you learn today?"
          }
        ]
      };
    },
    created() {
      this.getPosts();
      window.addEventListener("scroll", this.handleScroll);
    },
    computed: {
      subscribedSubs: function() {
        return this.subs.filter(sub => !!sub.isSubscribed);
      },
      filteredPosts: function() {
        return this.posts.filter(p => p.data.score >= this.filterCategory);
      },
      url: function() {
        var url = "https://www.reddit.com/r/" + this.currentSub;
  
        if (this.searchText) {
          url += "/search.json?q=" + this.searchText + "&restrict_sr=1";
        } else {
          url += "/top.json?limit=50&count=50&restrict_sr=1";
        }
        return url;
      }
    },
  
    methods: {
      validateSampleText(el) {
        var matching = el.target.value.match(/^[a-z0-9/. -]+$/i);
        this.searchText = matching && matching.length ? matching[0] : null;
      },
      truncate(str, max) {
        return str.length > max ? str.substr(0, max - 1) + "…" : str;
      },
      toggleMenu() {
        this.isActive = !this.isActive;
      },
      kFormatter(num) {
        return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
      },
      handleScroll() {
        if (
          document.body.scrollHeight -
            window.innerHeight -
            document.body.scrollTop <=
          5
        ) {
          if (this.nextPage != null) {
            this.getPosts(this.nextPage);
          }
        }
      },
      getPosts() {
        this.postsLoading = true;
        axios
          .get(this.url)
          .then(response => {

            this.posts = response.data.data.children;
  
            this.nextPage = response.data.data.after;
  
            this.postsLoading = false;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  });
  