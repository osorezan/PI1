module.exports = Actor

function Actor(actorDetails, movies) {
    this.name = actorDetails.name
    this.birthday = actorDetails.birthday
    this.deathday = actorDetails.deathday
    this.biography = actorDetails.biography
    this.place_of_birth = actorDetails.place_of_birth
    this.profile_path = actorDetails.profile_path
    this.homepage = actorDetails.homepage
    movies = movies.cast
}