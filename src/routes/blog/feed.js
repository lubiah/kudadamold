export const get = async ()=> {

    return {
        headers: { Location: "/blog/feed.xml" },
        status: 301
    }

}
