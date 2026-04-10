-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "enum_Seats_seat_type" AS ENUM ('standard', 'vip');

-- CreateEnum
CREATE TYPE "enum_ShowtimeSeats_status" AS ENUM ('available', 'booked', 'reserved');

-- CreateEnum
CREATE TYPE "enum_bookings_status" AS ENUM ('expired', 'unchecked', 'checked');

-- CreateEnum
CREATE TYPE "enum_buses_class" AS ENUM ('Luxury', 'Semi-Luxury', 'Standard');

-- CreateEnum
CREATE TYPE "enum_buses_comfort" AS ENUM ('AC', 'Non-AC');

-- CreateEnum
CREATE TYPE "enum_buses_layout" AS ENUM ('Seater', 'Sleeper', 'Semi-Sleeper');

-- CreateEnum
CREATE TYPE "enum_movies_status" AS ENUM ('Showing', 'Upcoming');

-- CreateEnum
CREATE TYPE "enum_staff_role" AS ENUM ('Driver', 'Conductor', 'Counter Staff');

-- CreateEnum
CREATE TYPE "enum_users_role" AS ENUM ('user', 'org');

-- CreateTable
CREATE TABLE "CinemaHalls" (
    "hall_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "total_rows" INTEGER NOT NULL,
    "total_columns" INTEGER NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "vipPrice" INTEGER NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CinemaHalls_pkey" PRIMARY KEY ("hall_id")
);

-- CreateTable
CREATE TABLE "MovieShowTime" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "theaterId" INTEGER NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "startTime" TIME(6) NOT NULL,
    "endTime" TIME(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "MovieShowTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seats" (
    "seat_id" SERIAL NOT NULL,
    "seat_name" VARCHAR(255) NOT NULL,
    "row_label" VARCHAR(255) NOT NULL,
    "col_number" INTEGER NOT NULL,
    "seat_type" "enum_Seats_seat_type" DEFAULT 'standard',
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "hall_id" INTEGER,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "ShowtimeSeats" (
    "showtime_seat_id" SERIAL NOT NULL,
    "status" "enum_ShowtimeSeats_status" DEFAULT 'available',
    "booked_by" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "showtime_id" INTEGER,
    "seat_id" INTEGER,

    CONSTRAINT "ShowtimeSeats_pkey" PRIMARY KEY ("showtime_seat_id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" VARCHAR(255) NOT NULL,
    "movie_name" VARCHAR(255) NOT NULL,
    "hall_name" VARCHAR(255) NOT NULL,
    "show_time" VARCHAR(255) NOT NULL,
    "show_date" DATE NOT NULL,
    "booked_seats" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" "enum_bookings_status" NOT NULL DEFAULT 'unchecked',
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "showtime_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "movie_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "duration" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255),
    "trailerLink" VARCHAR(255),
    "coverPic" VARCHAR(255),
    "status" "enum_movies_status" NOT NULL DEFAULT 'Showing',
    "releaseDate" TIMESTAMPTZ(6) NOT NULL,
    "featured" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "showtimes" (
    "showtime_id" SERIAL NOT NULL,
    "price" INTEGER,
    "show_date" TIMESTAMPTZ(6) NOT NULL,
    "show_time" TIME(6) NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "movie_id" INTEGER,
    "hall_id" INTEGER,

    CONSTRAINT "showtimes_pkey" PRIMARY KEY ("showtime_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "role" "enum_users_role" DEFAULT 'user',
    "isVerified" BOOLEAN DEFAULT false,
    "verificationToken" VARCHAR(255),
    "verificationTokenExpires" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "showtime_seats_showtime_id_seat_id" ON "ShowtimeSeats"("showtime_id", "seat_id");

-- CreateIndex
CREATE UNIQUE INDEX "movies_title_key" ON "movies"("title");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "CinemaHalls"("hall_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowtimeSeats" ADD CONSTRAINT "ShowtimeSeats_booked_by_fkey" FOREIGN KEY ("booked_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowtimeSeats" ADD CONSTRAINT "ShowtimeSeats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seats"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowtimeSeats" ADD CONSTRAINT "ShowtimeSeats_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("showtime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("showtime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "CinemaHalls"("hall_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE;

