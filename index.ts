class main {
  posts: HTMLElement[];
  filterContainer: HTMLElement;
  keys: HTMLElement[];
  categoryLinks: HTMLElement[];
  filterButtons: HTMLAnchorElement[];

  constructor(posts, filter_container) {
    this.posts = posts;
    this.filterContainer = filter_container;
    this.keys = filter_container.querySelectorAll(".filter-keys .key");
    this.categoryLinks = filter_container.querySelectorAll(
      ".category-links .link"
    );
    this.filterButtons = filter_container.querySelectorAll(
      ".filter-buttons .button-group .items .item button"
    );
  }

  disableLinkButtons() {
    // disable link buttons if amount of posts === 0

    const url = document.location;
    const baseUrl = url.origin + url.pathname;

    if (this.categoryLinks) {
      this.categoryLinks.forEach((link) => {
        if (
          link.getAttribute("href") === baseUrl ||
          link.getAttribute("href") === baseUrl + "/"
        ) {
          link.style.pointerEvents = "none";
        } else {
          link.classList.add("font-color-gray");
        }

        const e = link.querySelector(".amount-posts");
        if (e.textContent === "(0)") {
          link.classList.add("disabled");
        }
      });
    }
  }

  init() {
    // convert keys from node array to string one
    const keys: string[] = [];
    this.keys.forEach((key) => {
      const textContent = key.textContent;
      keys.push(textContent);
    });

    if (this.posts && keys) {
      let curQuery = document.location.search;
      let params = new URLSearchParams(curQuery);

      // for direct insert in address bar
      if (curQuery === "") {
        // show all projects
        this.posts.forEach((post) => {
          post.style.display = "flex";
        });
      } else {
        this.updateDisplay(params);
      }

      keys.forEach((key) => {
        this.filterButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();

            this.updateState(key, button);
          });
        });
      });

      keys.forEach((key) => {
        const removeButton = this.filterContainer.querySelector(
          ".filter-buttons .button-group .remove-filter." + key
        );
        removeButton.addEventListener("click", () => {
          // get current url
          const url = new URL(location.href);
          params = new URLSearchParams(url.search);
          params.delete(key);
          history.pushState(
            {},
            "",
            url.origin + url.pathname + params.toString()
          );
          this.updateDisplay(params);
        });
      });
    }
  }

  updateState(key: string, button: HTMLAnchorElement) {
    const url = new URL(location.href);
    url.searchParams.set(key, button.getAttribute("href"));
    history.pushState({}, "", url);

    const curQuery = document.location.search;
    const params = new URLSearchParams(curQuery);

    this.updateDisplay(params);
  }

  updateDisplay(params: URLSearchParams) {
    let tmpPosts = [...this.posts];

    const removeButtons: NodeListOf<HTMLElement> =
      this.filterContainer.querySelectorAll(
        ".filter-buttons .button-group .remove-filter"
      );
    let tmpButtons = [];

    const textFields: NodeListOf<HTMLElement> =
      this.filterContainer.querySelectorAll(
        ".filter-buttons .button-group .current-selection"
      );
    let tmpFields = [];

    params.forEach((value, key) => {
      tmpPosts = tmpPosts.filter((post) =>
        post.classList.contains(key + "=" + value)
      );

      removeButtons.forEach((button) => {
        if (button.classList.contains(key)) {
          tmpButtons.push(button);
        }
      });

      textFields.forEach((field) => {
        if (field.classList.contains(key)) {
          this.filterButtons.forEach((item) => {
            if (item.classList.contains(value)) {
              field.textContent = "(" + item.textContent + ")";
              tmpFields.push(field);
            }
          });
        }
      });
    });

    // TODO change entry name in browser history
    //if (document.location["href"].includes("/projekt/?")) {
    //  document.title = "filter posts";
    //}

    this.posts.forEach((post) => {
      if (this.posts.indexOf(post) === -1) {
        post.style.display = "none";
      } else {
        post.style.display = "flex";
      }
    });

    removeButtons.forEach((button) => {
      const buttonGroup = button.parentNode as HTMLElement;

      if (tmpButtons.indexOf(button) === -1) {
        button.style.display = "none";
        buttonGroup.classList.remove("selected");
      } else {
        button.style.display = "inline-block";
        buttonGroup.classList.add("selected");
      }
    });

    textFields.forEach((field) => {
      if (tmpFields.indexOf(field) === -1) {
        field.textContent = "";
      } else {
        // text is already added by function above
      }
    });
  }
}
