from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterUserSerializer
from rest_framework.decorators import api_view, permission_classes
import os
import uuid


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def getCurrentUser(request):
    user = request.user
    if not user.is_authenticated:
        return Response({})
    return Response({
        'user_name': user.user_name,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'image': user.get_absolute_image_url,
        'id': user.pk,
        'github': user.github,
        'website': user.website,
        'number_posts': user.posts.all().count(),
        'contact': user.contact,
        'email': user.email,
        'company': user.company,
        'about': user.about
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def editUser(request):
    try:
        user = request.user
        data = request.data
        user.first_name = data.get('first_name')
        user.last_name = data.get('last_name')
        user.github = data.get('github')
        user.website = data.get('website')
        user.contact = data.get('contact')
        user.email = data.get('email')
        user.company = data.get('company')
        user.about = data.get('about')
        file = request.data.get('avatar')
        if file != 'undefined':
            filename, file_extension = os.path.splitext(file.name)
            new_file_name = filename + str(uuid.uuid1()) + file_extension
            file.name = new_file_name
            user.image = file
        user.save()
        return Response({'message': 'success', 'code': 200, 'data': {
            'user_name': user.user_name,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'image': user.get_absolute_image_url,
            'id': user.pk,
            'github': user.github,
            'website': user.website,
            'number_posts': user.posts.all().count(),
            'contact': user.contact,
            'email': user.email,
            'company': user.company,
            'about': user.about
            }
        })
    except:
        return Response({'message': 'error', 'code': 500})
