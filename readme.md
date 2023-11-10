# LeMeS
Dibuat untuk memenuhi Tugas Milestone 2 - Web Services using SOAP and REST dari mata kuliah Pengembaangan Aplikasi berbasis Website 

## Deskripsi
Repository ini berisikan kode - kode untuk menyediakan REST service.


## How to Run 
1. Git clone repo ini 
2. Pastikan sudah install yarn
3. Copy .env.example ke file .env (buat dlu filenya)
4. Kalau pertama kali jalanin (baru awal2 clone), uncomment CMD ["yarn","start:prod"] yang ada di Dockerfile.server dan comment si CMD ["yarn","dev"]
5. Ketik docker-compose up --build
6. Comment CMD ["yarn","start:prod"] yang ada di Dockerfile.server (supaya databasenya ga di seed berkali2)  dan uncomment CMD ["yarn","dev"]