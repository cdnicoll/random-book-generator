package controllers;

import models.Genre;
import play.Logger;
import play.mvc.*;
import play.twirl.api.Html;
import views.html.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class MainController extends Controller {

    public Result index()
    {
        String pageTitle = "Random Book Generator";

//        List<String> genres = new ArrayList<String>();
//
//        genres.add("fantasy");
//        genres.add("scifi");

        Map<String, Genre> genres = new HashMap<String, Genre>();
        genres.put("0", new Genre("programming", "#74B8DB", "#5DACD5", "#46A0CF"));
        genres.put("1", new Genre("fantasy", "#DEC6DF", "#D1AFD2", "#CAA3CC"));
        genres.put("2", new Genre("scifi", "#C6DFD1", "#AFD2BE", "#A3CCB5"));
        genres.put("3", new Genre("horror", "#E6C894", "#DCB269", "#D7A753"));
        genres.put("4", new Genre("fiction", "#E2ABAE", "#D78A8E", "#D1797E"));
        genres.put("5", new Genre("traveling", "#D3ABE2", "#C28AD7", "#B979D1"));


        /*
        Map<String, String> genresOld = new HashMap<String, String>();
        genresOld.put("0", "programming");
        genresOld.put("1","fantasy");
        genresOld.put("2", "scifi");
        genresOld.put("3", "horror");
        genresOld.put("4", "fiction");
        genresOld.put("5", "traveling");
        */



        return ok(views.html.RandomBookGenerator.index.render(pageTitle, genres));
    }
}
