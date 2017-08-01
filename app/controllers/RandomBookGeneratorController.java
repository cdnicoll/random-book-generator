package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

/**
 * Created by conicoll on 2017-08-01.
 */
public class RandomBookGeneratorController extends Controller {

    public Result index() {
        return ok(index.render("Your new application is ready."));
    }

}
