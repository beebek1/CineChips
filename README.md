Based on everything built across this entire project:
Admin Side

Add, edit, delete movies with cover image, genre, duration, status, trailer link, featured flag
Add, edit, delete cinema halls with row/column config, base price, VIP price. Seats auto-generate on hall creation
Schedule showtimes per movie, per hall, per language. Collision detection blocks overlapping schedules using movie duration + 15 min buffer. Past datetime blocked
Delete showtimes

User Side

Homepage shows featured movie hero, now showing grid, upcoming grid
Now showing page with genre filter
Date booking page: pick date, hall, language, time slot for a specific movie
Seat selection page: real seat map pulled from API for that showtime, arch layout, VIP row marked with crown, per-seat pricing, max 10 seats, booking summary sidebar with service fee breakdown
Confirm booking calls the API and marks seats as booked

Data integrity

Seats auto-created when a hall is added
ShowtimeSeats auto-created when a showtime is scheduled
Cascade delete: deleting a hall removes its seats, deleting a showtime removes its seat records
Foreign key hall_id on seats enforced at DB level
Documentation update - trace part 1
Documentation update - trace part 2
Documentation update - trace part 3
Documentation update - trace part 4
Documentation update - trace part 5
Documentation update - trace part 6
