using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using System.Threading.Tasks;

namespace BudgetAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthService(IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<string> Register(UserDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Balance = 0
            };
            await _userRepository.AddUser(user);
            return _jwtService.GenerateSecurityToken(user.Username, user.UserId);
        }

        public async Task<string> Login(UserDto userDto)
        {
            var user = await _userRepository.GetUserByUsername(userDto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException();
            }
            return _jwtService.GenerateSecurityToken(user.Username, user.UserId);
        }
    }
}