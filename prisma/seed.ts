import { PrismaClient } from '@prisma/client';
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpar o banco de dados
    console.log('🗑️ Limpando banco de dados...');
    await prisma.payment.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();
    await prisma.barber.deleteMany();

    console.log('👤 Criando usuário admin...');
    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@agendasis.com',
        password: await bcryptjs.hash('admin123', 10),
        firstName: 'Admin',
        lastName: 'System',
        role: 'ADMIN',
        phone: '(11) 99999-9999'
      }
    });

    console.log('👤 Criando usuário proprietário...');
    // Criar usuário proprietário
    const ownerUser = await prisma.user.create({
      data: {
        email: 'owner@agendasis.com',
        password: await bcryptjs.hash('owner123', 10),
        firstName: 'João',
        lastName: 'Silva',
        role: 'OWNER',
        phone: '(11) 98888-8888'
      }
    });

    console.log('💈 Criando barbeiros...');
    // Criar barbeiros
    const barbers = await Promise.all([
      prisma.barber.create({
        data: {
          firstName: 'Pedro',
          lastName: 'Santos',
          email: 'pedro@agendasis.com',
          phone: '(11) 97777-7777',
          specialties: ['Corte Masculino', 'Barba']
        }
      }),
      prisma.barber.create({
        data: {
          firstName: 'Lucas',
          lastName: 'Oliveira',
          email: 'lucas@agendasis.com',
          phone: '(11) 96666-6666',
          specialties: ['Corte Masculino', 'Coloração']
        }
      }),
      prisma.barber.create({
        data: {
          firstName: 'Rafael',
          lastName: 'Costa',
          email: 'rafael@agendasis.com',
          phone: '(11) 95555-5555',
          specialties: ['Corte Masculino', 'Tratamentos Capilares']
        }
      })
    ]);

    console.log('💇‍♂️ Criando serviços...');
    // Criar serviços
    const services = await Promise.all([
      prisma.service.create({
        data: {
          name: 'Corte Masculino',
          description: 'Corte tradicional ou moderno com acabamento perfeito',
          duration: 30,
          price: 50.00
        }
      }),
      prisma.service.create({
        data: {
          name: 'Barba',
          description: 'Barba feita com navalha e produtos especiais',
          duration: 30,
          price: 40.00
        }
      }),
      prisma.service.create({
        data: {
          name: 'Corte + Barba',
          description: 'Combo de corte masculino e barba',
          duration: 60,
          price: 80.00
        }
      }),
      prisma.service.create({
        data: {
          name: 'Coloração',
          description: 'Coloração completa com produtos de qualidade',
          duration: 90,
          price: 120.00
        }
      }),
      prisma.service.create({
        data: {
          name: 'Hidratação',
          description: 'Tratamento capilar com hidratação profunda',
          duration: 45,
          price: 70.00
        }
      })
    ]);

    console.log('👥 Criando clientes...');
    // Criar clientes
    const clients = await Promise.all([
      prisma.user.create({
        data: {
          email: 'cliente1@email.com',
          password: await bcryptjs.hash('cliente123', 10),
          firstName: 'Maria',
          lastName: 'Pereira',
          role: 'CLIENT',
          phone: '(11) 94444-4444',
          loyaltyPoints: 50
        }
      }),
      prisma.user.create({
        data: {
          email: 'cliente2@email.com',
          password: await bcryptjs.hash('cliente123', 10),
          firstName: 'Carlos',
          lastName: 'Ferreira',
          role: 'CLIENT',
          phone: '(11) 93333-3333',
          loyaltyPoints: 30
        }
      })
    ]);

    console.log('📅 Criando agendamentos...');
    // Criar alguns agendamentos de exemplo
    const appointments = await Promise.all([
      prisma.appointment.create({
        data: {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000), // amanhã
          status: 'CONFIRMED',
          userId: clients[0].id,
          barberId: barbers[0].id,
          serviceId: services[0].id,
          payment: {
            create: {
              amount: services[0].price,
              status: 'PAID'
            }
          }
        }
      }),
      prisma.appointment.create({
        data: {
          date: new Date(Date.now() + 48 * 60 * 60 * 1000), // depois de amanhã
          status: 'PENDING',
          userId: clients[1].id,
          barberId: barbers[1].id,
          serviceId: services[2].id
        }
      })
    ]);

    console.log('✅ Seed concluído com sucesso!');
    console.log({
      admin: adminUser,
      owner: ownerUser,
      barbers,
      services,
      clients,
      appointments
    });
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔄 Desconectando do banco de dados...');
    await prisma.$disconnect();
  }); 