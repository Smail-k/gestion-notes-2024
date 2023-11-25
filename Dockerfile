FROM openjdk:17
EXPOSE 8080
ADD target/notes-0.0.1-SNAPSHOT.jar notes.jar
ENTRYPOINT [ "java" ,"-jar","notes.jar"]