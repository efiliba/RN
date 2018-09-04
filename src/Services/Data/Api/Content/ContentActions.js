import { BaseActions } from "../Base/BaseActions";
import { StateProperty } from "../../Models/StateProperty";
import { StateDictionaryKeys } from "../../Models/StateDictionaryKeys";

export class ContentActions extends BaseActions {
    constructor() {
        super();
    }

    getTermsOfUse() {
        const url = "/api/content/terms-of-use";

        return super.getSuccessActionDefition(url, "termsOfUse");
    }    

    getBlogArticles() {
        const url = "/api/content/blog-article";

        return super.getSuccessActionDefition(url, "blogArticles");
    }

    getArchives() {
        const url = "/api/content/topics";

        return super.getSuccessActionDefition(url, "archives");
    }

    getArticle(section, slug) {
        const url = `/api/article/getArticle?section=${section}&slug=${slug}`;

        return super.getSuccessActionDefition(url, "articles", StateDictionaryKeys.getArticleKey(section, slug));
    }

    getArticleById(id) {
        const url = `/api/articles/${id}`;
        return super.getSuccessActionDefition(url, "articles", StateDictionaryKeys.getArticleKey("learn", id));
    }

    getPrivacyPolicy() {
        const url = `/api/article/getArticle?section=&slug=privacy-policy`;
        return super.getSuccessActionDefition(url, "privacyPolicy");
    }

    getByTag(tag) {
        let url = `/api/article/GetArticlesByTag?tagSlug=${tag}`;      
        return super.getSuccessActionDefition(url, "articlesByTag",tag);
    }
    
    getArticlesByTag(tag, statePropertyName, count) {
        let url = `/api/article/GetArticlesByTag?tagSlug=${tag}`;

        if (count) {
            url = url + `&count=${count}`;
        }

        return super.getSuccessActionDefition(url, statePropertyName);
    }

    getArticleGroup(section) {
        const url = `/api/articles/section/${section}`;
        return super.getSuccessActionDefition(url, "articleGroup");
    }

    getPressCentreArticles() {
        const url = `/api/articles/section/press-centre`;
        return super.getSuccessActionDefition(url, "pressCentreArticles");
    }

    getTagBySlug(slug) {
        let url = `/api/content/tag/${slug}`;
        return super.getSuccessActionDefition(url, "tag");
    }
};