# -------- BUILD STAGE --------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom first to leverage Docker cache
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy source code
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT env variable
EXPOSE 8080

# Run Spring Boot
ENTRYPOINT ["java","-jar","app.jar"]
