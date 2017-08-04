package models;

public class Genre {
    public String genre;
    public String colorLight;
    public String colorMedium;
    public String colorDark;

    public Genre(String genre, String colorLight, String colorMedium, String colorDark)
    {
        this.genre = genre;
        this.colorLight = colorLight;
        this.colorMedium = colorMedium;
        this.colorDark = colorDark;
    }
}
