using BorrowAwayAPI.Context;
using BorrowAwayAPI.DTOs;
using BorrowAwayAPI.Models.BorrowAwayAPI.Models;
using BorrowAwayAPI.Services.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace BorrowAwayAPI.Services
{
    public class AnnouncementService:IAnnouncementService
    {
        private readonly BorrowAwayDbContext _dbContext;
        public AnnouncementService(BorrowAwayDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddAnnouncementAsync(AnnouncementDTO announcementToAdd,string userEmail)
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
            string downloadDirectory = @"..\\Images\\" + userEmail + "\\" + Guid.NewGuid();
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
            List<Announcement> announcementsFromDb = _dbContext.Announcements.ToList();
            List<AnnouncementDTO> announcementsToReturn = new List<AnnouncementDTO>();
            foreach(var ann in announcementsFromDb)
            {
                AnnouncementDTO announcement = new AnnouncementDTO();
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
                 for(int i = 0; i < ann.NumberOfImages; i++)
                {
                    string path = ann.ImagesDirectoryPath + $"\\{i}.png";
                    byte[] imageArray = System.IO.File.ReadAllBytes(path);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    announcement.ImagesData.Add(base64ImageRepresentation);
                }
                announcementsToReturn.Add(announcement);
            }
            return announcementsToReturn;
           
        }
    }
}
