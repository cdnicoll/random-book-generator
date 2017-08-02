package controllers;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.mvc.*;
import play.libs.ws.*;

import java.util.Random;
import java.util.concurrent.CompletionStage;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class ApiController extends Controller {

    @Inject WSClient ws;

    public CompletionStage<Result> subject(String subject) {
        String urlQuery = "http://openlibrary.org/subjects/"+subject+".json?published_in=2014-2017&limit=100000&detail=true";
        Logger.debug("Accessing Url:"+ urlQuery);
        WSRequest request = ws.url(urlQuery);
        CompletionStage<WSResponse> completionStage = request.get();
        //return completionStage.thenApply(response -> ok(response.asJson()));
        return completionStage.thenApply(response -> {
            JsonNode json = response.asJson();
            JsonNode total = json.findPath("work_count");
            Logger.debug("Work Count: "+ total.asInt());
            Random rand = new Random();
            int min = 0;
            int max = total.asInt();
            int randomNum = rand.nextInt((max - min) + 0) + min;

            Logger.debug("Random Int: "+randomNum);


            System.out.println(randomNum);
            JsonNode works = json.findPath("works").get(randomNum);
            //JsonNode works = json.findPath("works");
            //System.out.println(Json.asciiStringify(json.findPath("works")));
            return ok(works);
        });
    }

    public CompletionStage<Result> bookDetail(String id) {
        String urlQuery = "https://openlibrary.org/works/"+id+".json";
        Logger.debug("Accessing Url:"+ urlQuery);
        WSRequest request = ws.url(urlQuery);
        CompletionStage<WSResponse> completionStage = request.get();
        //return completionStage.thenApply(response -> ok(response.asJson()));
        return completionStage.thenApply(response -> {
            JsonNode json = response.asJson();
            /*
            JsonNode total = json.findPath("work_count");
            Logger.debug("Work Count: "+ total.asInt());
            Random rand = new Random();
            int min = 0;
            int max = total.asInt();
            int randomNum = rand.nextInt((max - min) + 0) + min;

            Logger.debug("Random Int: "+randomNum);


            System.out.println(randomNum);
            JsonNode works = json.findPath("works").get(randomNum);
            //JsonNode works = json.findPath("works");
            //System.out.println(Json.asciiStringify(json.findPath("works")));
            return ok(works);
            */
            return ok(json);
        });
    }
}
