FROM amazoncorretto:17-alpine
ARG JAR_FILE=build/libs/backend*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]