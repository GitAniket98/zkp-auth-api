import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

const buildServer = () => {
    const app = Fastify({ logger: true });

    // Security Middlewares
    app.register(cors, { origin: true });
    app.register(helmet);
    app.register(rateLimit, {
        max: 100, // requests
        timeWindow: "1 minute",
    });

    // Health check route
    app.get("/health", async () => {
        return { status: "ok", timestamp: new Date().toISOString() };
    });

    return app;
};

const start = async () => {
    const app = buildServer();
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
        console.log("🚀 Server running at http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
