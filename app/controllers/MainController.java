package controllers;

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

        Map<String, String> genres = new HashMap<String, String>();
        genres.put("0", "programming");
        genres.put("1","fantasy");
        genres.put("2", "scifi");
        genres.put("3", "horror");
        genres.put("4", "fiction");
        genres.put("5", "traveling");



        return ok(views.html.RandomBookGenerator.index.render(pageTitle, genres));
    }
}
