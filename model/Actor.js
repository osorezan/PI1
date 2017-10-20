module.exports = Actor

function Actor(actorDetails, movies) {
    this.name = actorDetails.name
    this.birthday = actorDetails.birthday
    this.deathday = actorDetails.deathday
    this.biography = actorDetails.biography
    this.place_of_birth = actorDetails.place_of_birth
    this.profile_path = 'https://image.tmdb.org/t/p/w500' + actorDetails.profile_path
    this.homepage = actorDetails.homepage
    this.cast = movies.cast
}