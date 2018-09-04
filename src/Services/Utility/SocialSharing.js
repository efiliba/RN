export class SocialSharing {
    static facebookShare(url, title, description) {
        const winWidth = 520;
        const winHeight = 350;
        const winTop = (screen.height / 2) - (winHeight / 2);
        const winLeft = (screen.width / 2) - (winWidth / 2);
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&name=${title}&description=${description}`;

        window.open(facebookUrl, "sharer", "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
    }

    static twitterShare(url, tweet) {
        url = encodeURIComponent(url);
        tweet = encodeURIComponent(tweet);

        return `https://twitter.com/intent/tweet?original_referer=${url}&related=CreditSavvy&text=${tweet}`;
    }

    static googlePlusShare(url) {
        url = encodeURIComponent(url);

        return `https://plus.google.com/share?url=${url}`;
    }
}