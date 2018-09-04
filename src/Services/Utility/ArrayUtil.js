import React from "react";
export class ArrayUtil {

    static orderByArticleIdDesc(articles) {
        return articles.sort(function(a, b) {
            return b.ArticleId - a.ArticleId;  
        });

       
    }

   


}