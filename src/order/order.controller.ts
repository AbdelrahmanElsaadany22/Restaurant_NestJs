import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { userRoles } from 'src/auth/schemas/user.schema';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}
    @Get('order/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.ADMIN,userRoles.USER)
    async getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
    }


    @Post('add/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER)
    async createOrder(@Body()CreateOrderDto:CreateOrderDto,@Param('id') id:string){
        return this.orderService.createOrder(CreateOrderDto,id)
    }

    @Put('edit/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER)
    async editOrder(@Body()CreateOrderDto:CreateOrderDto,@Param('id') id:string ,@Req() req){
        
        return this.orderService.editOrder(id,CreateOrderDto,req.user.id)
    }

    @Delete('cancel/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER)
    async cancelOrder(@Param('id') id:string){
        return this.orderService.cancelOrder(id)
    }
}
