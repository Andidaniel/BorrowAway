using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace BorrowAwayAPI.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly BorrowAwayDbContext _dbContext;
        public AnnouncementService(BorrowAwayDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementToAdd, string userEmail)
        {
            Announcement announcementToSave = new Announcement();
            announcementToSave.Title = announcementToAdd.Title;
            announcementToSave.Description = announcementToAdd.Description;
            announcementToSave.NumberOfImages = announcementToAdd.NumberOfImages;
            announcementToSave.PricePerDay = announcementToAdd.PricePerDay;
            announcementToSave.CreationDate = DateTime.Now;
            announcementToSave.ContactMethod = announcementToAdd.ContactMethod;
            announcementToSave.Location = announcementToAdd.Location;
            announcementToSave.CategoryId = announcementToAdd.CategoryId;
            announcementToSave.UserId = _dbContext.Users.First(u => u.Email.Equals(userEmail)).Id;
            string downloadDirectory = @$".{Path.DirectorySeparatorChar}Image{Path.DirectorySeparatorChar}" + userEmail + "{Path.DirectorySeparatorChar}" + Guid.NewGuid();
            Directory.CreateDirectory(downloadDirectory);
            announcementToSave.ImagesDirectoryPath = downloadDirectory;


            if (announcementToSave.NumberOfImages > 0)
            {

                int index = 0;
                foreach (var img in announcementToAdd.ImagesData)
                {
                    string uniqueFileName = index.ToString().ToLower() + ".png";
                    index++;
                    string filePath = Path.Combine(downloadDirectory, uniqueFileName);
                    byte[] bytes = Convert.FromBase64String(
                        img
                        .Substring(
                            img
                            .LastIndexOf(',') + 1));

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        using (var memoryStream = new MemoryStream(bytes))
                        {
                            memoryStream.CopyTo(stream);
                        }
                    }
                }

            }

            _dbContext.Announcements.Add(announcementToSave);
            return await _dbContext.SaveChangesAsync() > 0;




        }

        public async Task<List<AnnouncementDTO>> GetAllAnnouncementsAsync()
        {
            List<Announcement> announcementsFromDb = await _dbContext.Announcements.ToListAsync();
            List<AnnouncementDTO> announcementsToReturn = new List<AnnouncementDTO>();
            foreach (var ann in announcementsFromDb)
            {
                AnnouncementDTO announcement = new AnnouncementDTO();
                announcement.Id = ann.Id;
                announcement.Title = ann.Title;
                announcement.Description = ann.Description;
                announcement.NumberOfImages = ann.NumberOfImages;
                announcement.PricePerDay = ann.PricePerDay;
                announcement.CreationDate = ann.CreationDate;
                announcement.ContactMethod = ann.ContactMethod;
                announcement.Location = ann.Location;
                announcement.CategoryId = ann.CategoryId;
                announcement.UserId = ann.UserId;
                announcement.ImagesData = new List<string>();
                for (int i = 0; i < ann.NumberOfImages; i++)
                {
                    string path = ann.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    announcement.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                }
                announcementsToReturn.Add(announcement);
            }
            return announcementsToReturn;
        }

        public async Task<List<AnnouncementDTO>> GetLastNAnnouncementsAsync(int n)
        {
            List<Announcement> announcementsFromDb = await _dbContext.Announcements.OrderBy(a => a.CreationDate).ToListAsync();
            announcementsFromDb = announcementsFromDb.Skip(Math.Max(0, announcementsFromDb.Count - n)).ToList();
            List<AnnouncementDTO> announcementsToReturn = new List<AnnouncementDTO>();
            foreach (var ann in announcementsFromDb)
            {
                AnnouncementDTO announcement = new AnnouncementDTO();
                announcement.Id = ann.Id;
                announcement.Title = ann.Title;
                announcement.Description = ann.Description;
                announcement.NumberOfImages = ann.NumberOfImages;
                announcement.PricePerDay = ann.PricePerDay;
                announcement.CreationDate = ann.CreationDate;
                announcement.ContactMethod = ann.ContactMethod;
                announcement.Location = ann.Location;
                announcement.CategoryId = ann.CategoryId;
                announcement.UserId = ann.UserId;
                announcement.ImagesData = new List<string>();
                for (int i = 0; i < ann.NumberOfImages; i++)
                {
                    string path = ann.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    announcement.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                }
                announcementsToReturn.Add(announcement);
            }
            return announcementsToReturn;
        }

        public async Task<AnnouncementDTO> GetAnnouncementById(int id)
        {
            Announcement announcementFromDb = await _dbContext.Announcements.FirstOrDefaultAsync(a => a.Id == id);
            if (announcementFromDb != null)
            {
                AnnouncementDTO announcement = new AnnouncementDTO();
                announcement.Id = announcementFromDb.Id;
                announcement.Title = announcementFromDb.Title;
                announcement.Description = announcementFromDb.Description;
                announcement.NumberOfImages = announcementFromDb.NumberOfImages;
                announcement.PricePerDay = announcementFromDb.PricePerDay;
                announcement.CreationDate = announcementFromDb.CreationDate;
                announcement.ContactMethod = announcementFromDb.ContactMethod;
                announcement.Location = announcementFromDb.Location;
                announcement.CategoryId = announcementFromDb.CategoryId;
                announcement.UserId = announcementFromDb.UserId;
                announcement.ImagesData = new List<string>();
                for (int i = 0; i < announcementFromDb.NumberOfImages; i++)
                {
                    string path = announcementFromDb.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    announcement.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                }
                return announcement;
            }
            else
                return null;
        }

        public async Task<string> GetPosterNameById(Guid userId)
        {
            AppUser user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            return user.FirstName;
        }

        public async Task<List<AnnouncementDTO>> GetAllAnnouncementsByUserIdAsync(Guid userId)
        {
            AppUser? user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            List<Announcement> announcements = await _dbContext.Announcements.Where(a => a.UserId.Equals(userId)).ToListAsync();
            List<AnnouncementDTO> announcementDTOs = new List<AnnouncementDTO>();
            foreach (Announcement ann in announcements)
            {
                AnnouncementDTO dtoToAdd = new AnnouncementDTO();
                dtoToAdd.Id = ann.Id;
                dtoToAdd.Title = ann.Title;
                dtoToAdd.Description = ann.Description;
                dtoToAdd.NumberOfImages = ann.NumberOfImages;
                dtoToAdd.PricePerDay = ann.PricePerDay;
                dtoToAdd.CreationDate = ann.CreationDate;
                dtoToAdd.ContactMethod = ann.ContactMethod;
                dtoToAdd.Location = ann.Location;
                dtoToAdd.CategoryId = ann.CategoryId;
                dtoToAdd.UserId = ann.UserId;
                dtoToAdd.ImagesData = new List<string>();
                for (int i = 0; i < ann.NumberOfImages; i++)
                {
                    string path = ann.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    dtoToAdd.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                }
                announcementDTOs.Add(dtoToAdd);
            }

            return announcementDTOs;
        }

        public async Task<List<AnnouncementDTO>> GetAllAnnouncementsByCategory(int categoryId)
        {
            List<Announcement> announcementsFromDb = await _dbContext.Announcements.Where(a => a.CategoryId == categoryId).OrderBy(a => a.CreationDate).ToListAsync();
            List<AnnouncementDTO> announcementDTOs = new List<AnnouncementDTO>();
            foreach (Announcement ann in announcementsFromDb)
            {
                AnnouncementDTO dtoToAdd = new AnnouncementDTO();
                dtoToAdd.Id = ann.Id;
                dtoToAdd.Title = ann.Title;
                dtoToAdd.Description = ann.Description;
                dtoToAdd.NumberOfImages = ann.NumberOfImages;
                dtoToAdd.PricePerDay = ann.PricePerDay;
                dtoToAdd.CreationDate = ann.CreationDate;
                dtoToAdd.ContactMethod = ann.ContactMethod;
                dtoToAdd.Location = ann.Location;
                dtoToAdd.CategoryId = ann.CategoryId;
                dtoToAdd.UserId = ann.UserId;
                dtoToAdd.ImagesData = new List<string>();
                for (int i = 0; i < ann.NumberOfImages; i++)
                {
                    string path = ann.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    dtoToAdd.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                }
                announcementDTOs.Add(dtoToAdd);
            }

            return announcementDTOs;
        }

        public async Task<List<AnnouncementDTO>> GetAllAnnouncementsBySearchText(string searchText)
        {
            List<Announcement> announcementsFromDb = await _dbContext.Announcements.ToListAsync();
            List<AnnouncementDTO> announcementDTOs = new List<AnnouncementDTO>();

            string[] keywords = searchText.ToLower().Split(new char[] { ' ', ',', '.', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (Announcement ann in announcementsFromDb)
            {
                bool isMatch = false;

                foreach (string keyword in keywords)
                {
                    if (ann.Title.ToLower().Contains(keyword) || ann.Description.ToLower().Contains(keyword))
                    {
                        isMatch = true;
                        break;
                    }
                }

                if (isMatch)
                {
                    AnnouncementDTO dtoToAdd = new AnnouncementDTO();
                    dtoToAdd.Id = ann.Id;
                    dtoToAdd.Title = ann.Title;
                    dtoToAdd.Description = ann.Description;
                    dtoToAdd.NumberOfImages = ann.NumberOfImages;
                    dtoToAdd.PricePerDay = ann.PricePerDay;
                    dtoToAdd.CreationDate = ann.CreationDate;
                    dtoToAdd.ContactMethod = ann.ContactMethod;
                    dtoToAdd.Location = ann.Location;
                    dtoToAdd.CategoryId = ann.CategoryId;
                    dtoToAdd.UserId = ann.UserId;
                    dtoToAdd.ImagesData = new List<string>();
                    for (int i = 0; i < ann.NumberOfImages; i++)
                    {
                        string path = ann.ImagesDirectoryPath + $"{Path.DirectorySeparatorChar}{i}.png";
                        byte[] imageArray = System.IO.File.ReadAllBytes(path);
                        string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                        dtoToAdd.ImagesData.Add("data:image/png;base64," + base64ImageRepresentation);
                    }
                    announcementDTOs.Add(dtoToAdd);
                }
            }

            return announcementDTOs;
        }
    }
}