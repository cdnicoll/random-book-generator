package controllers;

import play.Logger;
import play.mvc.*;
import play.twirl.api.Html;
import views.html.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class MainController extends Controller {

    public Result index()
    {
        String pageTitle = "Random Book Generator";
        Html htmlContent = new Html("<div><p>This is a sample view</p><p>Passing in HTML content</p></div>");
        return ok(views.html.RandomBookGenerator.index.render(pageTitle, htmlContent));
    }
}
