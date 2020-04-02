class GoogleMaps {
    protected static instance: GoogleMaps | null = null;

    protected static loaded: boolean = false;

    protected static readonly ID: string = "google-maps";
    protected static readonly URL: string =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places";

    protected static load() {
        if(typeof window !== 'undefined' && !GoogleMaps.loaded) {
            if(!document.querySelector(`#{GoogleMaps.ID}`))
                GoogleMaps.createScriptElement();

            GoogleMaps.loaded = true;
        }
    }

    protected static createScriptElement() {
        const headElement = document.querySelector("head");
        if(!headElement)
            return;

        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", GoogleMaps.ID);
        script.src = GoogleMaps.URL;
        headElement.appendChild(script);
    }

    public static getInstance() {
        if(!GoogleMaps.instance) {
            GoogleMaps.instance = new GoogleMaps();
            GoogleMaps.load();
        }

        return GoogleMaps.instance;
    }

    public static get google() {
        return window.google;
    }
}

export default GoogleMaps;
